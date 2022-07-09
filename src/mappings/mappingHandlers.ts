import {SubstrateEvent} from "@subql/types";
import {Reputation, Post} from "../types";

function createReputation(address: string) {
    const entity = new Reputation(address)
    entity.value = 0
    return entity
}

async function getReputation(address: string) {
    let entity = await Reputation.get(address)
    if (!entity) {
        entity = createReputation(address)
    }
    return entity
}

async function updateReputation(address: string, change: number) {
    const reputation = await getReputation(address)
    reputation.value += change
    await reputation.save()
}

export async function handleEventProfileCreated(event: SubstrateEvent) {
    const {event: {data: [account]}} = event;
    await updateReputation(account.toString(), 1)
}

export async function handleEventPostCreated(event: SubstrateEvent) {
    const {event: {data: [account, postId]}} = event;
    await updateReputation(account.toString(), 3)
    
    const post = new Post(postId.toString())
    post.owner = account.toString()
    post.save()
}

export async function handleEventPostReactionCreated(event: SubstrateEvent) {
    const {event: {data: [, postId, , _type]}} = event;
    const post = await Post.get(postId.toString())
    const postOwner = post.owner
    const type = _type.toString()
    let change: number
    if (type === 'Upvote') {
        change = 5
    } else {
        change = -1
    }
    await updateReputation(postOwner, change)
}

export async function handleEventPostReactionDeleted(event: SubstrateEvent) {
    const {event: {data: [, postId, , _type]}} = event;
    const post = await Post.get(postId.toString())
    const postOwner = post.owner
    const type = _type.toString()
    let change: number
    if (type === 'Upvote') {
        change = -5
    } else {
        change = 1
    }
    await updateReputation(postOwner, change)
}

export async function handleEventPostReactionUpdated(event: SubstrateEvent) {
    const {event: {data: [, postId, , _type]}} = event;
    const post = await Post.get(postId.toString())
    const postOwner = post.owner
    const type = _type.toString()
    let change: number
    if (type === 'Upvote') {
        change = -5 - 1
    } else {
        change = 1 + 5
    }
    await updateReputation(postOwner, change)
}
