const env = {
    projectId: import.meta.env.VITE_PROJECT_ID,
    apiEndpoint: import.meta.env.VITE_API_ENDPOINT,
    dbId: import.meta.env.VITE_DB_ID,
    collectionId: import.meta.env.VITE_BLOG_COLLECTION_ID,
    bucketId: import.meta.env.VITE_BUCKET_ID,
    RTE_API_KEY: import.meta.env.VITE_TINY_MCE_API_KEY
}

export default env