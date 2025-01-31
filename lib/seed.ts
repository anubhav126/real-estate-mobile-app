import { ID } from "react-native-appwrite";
import { databases, config } from "./appwrite";
import {
    agentImages,
    galleryImages,
    propertiesImages,
    reviewImages,
} from "./data";

const COLLECTIONS = {
    AGENT: config.agentsCollectionId,
    REVIEWS: config.reviewsCollectionId,
    GALLERY: config.galleriesCollectionId,
    PROPERTY: config.propertiesCollectionId,
};

const propertyTypes = [
    "House",
    "Studio",
    "Villa",
    "Apartment",
    "Hostel",
    "Bungalow",
    "Other",
];

const facilities = [
    "Laundry",
    "Parking",
    "Pool",
    "Gym",
    "Healthcare",
];

function getRandomSubset<T>(
    array: T[],
    minItems: number,
    maxItems: number
): T[] {
    if (minItems > maxItems) {
        throw new Error("minItems cannot be greater than maxItems");
    }
    if (minItems < 0 || maxItems > array.length) {
        throw new Error(
            "minItems or maxItems are out of valid range for the array"
        );
    }
    const subsetSize =
        Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
    const arrayCopy = [...array];

    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[randomIndex]] = [
            arrayCopy[randomIndex],
            arrayCopy[i],
        ];
    }
    return arrayCopy.slice(0, subsetSize);
}

async function clearCollection(databaseId: string, collectionId: string) {
    try {
        const documents = await databases.listDocuments(databaseId, collectionId);
        console.log(`Clearing ${documents.documents.length} documents from collection ${collectionId}`);

        for (const doc of documents.documents) {
            await databases.deleteDocument(databaseId, collectionId, doc.$id);
        }
    } catch (error) {
        console.error(`Error clearing collection ${collectionId}:`, error);
        throw error;
    }
}

async function seed() {
    try {
        console.log("Starting data seeding process...");
        console.log("Database ID:", config.databaseId);

        // Clear existing data
        for (const key in COLLECTIONS) {
            const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
            if (!collectionId) {
                throw new Error(`Missing collection ID for ${key}`);
            }
            await clearCollection(config.databaseId!, collectionId);
        }

        console.log("Cleared all existing data.");

        // Seed Agents
        const agents = [];
        for (let i = 1; i <= 5; i++) {
            try {
                const agent = await databases.createDocument(
                    config.databaseId!,
                    COLLECTIONS.AGENT!,
                    ID.unique(),
                    {
                        name: `Agent ${i}`,
                        email: `agent${i}@example.com`,
                        avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
                    }
                );
                agents.push(agent);
                console.log(`Created agent ${i} with ID: ${agent.$id}`);
            } catch (error) {
                console.error(`Error creating agent ${i}:`, error);
                throw error;
            }
        }
        console.log(`Seeded ${agents.length} agents.`);

        // Seed Reviews
        const reviews = [];
        for (let i = 1; i <= 20; i++) {
            try {
                const review = await databases.createDocument(
                    config.databaseId!,
                    COLLECTIONS.REVIEWS!,
                    ID.unique(),
                    {
                        name: `Reviewer ${i}`,
                        avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
                        review: `This is a review by Reviewer ${i}.`,
                        rating: Math.floor(Math.random() * 5) + 1,
                    }
                );
                reviews.push(review);
                console.log(`Created review ${i} with ID: ${review.$id}`);
            } catch (error) {
                console.error(`Error creating review ${i}:`, error);
                throw error;
            }
        }
        console.log(`Seeded ${reviews.length} reviews.`);

        // Seed Galleries
        const galleries = [];
        for (let i = 0; i < galleryImages.length; i++) {
            try {
                const gallery = await databases.createDocument(
                    config.databaseId!,
                    COLLECTIONS.GALLERY!,
                    ID.unique(),
                    { image: galleryImages[i] }
                );
                galleries.push(gallery);
                console.log(`Created gallery ${i + 1} with ID: ${gallery.$id}`);
            } catch (error) {
                console.error(`Error creating gallery ${i + 1}:`, error);
                throw error;
            }
        }
        console.log(`Seeded ${galleries.length} galleries.`);

        // Seed Properties
        for (let i = 1; i <= 20; i++) {
            try {
                const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
                const assignedReviews = getRandomSubset(reviews, 5, 7);
                const assignedGalleries = getRandomSubset(galleries, 3, 8);

                console.log(`Property ${i} relationships:`, {
                    agentId: assignedAgent.$id,
                    reviewIds: assignedReviews.map(r => r.$id),
                    galleryIds: assignedGalleries.map(g => g.$id)
                });

                const selectedFacilities = facilities
                    .sort(() => 0.5 - Math.random())
                    .slice(0, Math.floor(Math.random() * facilities.length) + 1);

                const image =
                    propertiesImages.length - 1 >= i
                        ? propertiesImages[i]
                        : propertiesImages[
                            Math.floor(Math.random() * propertiesImages.length)
                            ];

                const property = await databases.createDocument(
                    config.databaseId!,
                    COLLECTIONS.PROPERTY!,
                    ID.unique(),
                    {
                        name: `Property ${i}`,
                        type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
                        description: `This is the description for Property ${i}.`,
                        address: `123 Property Street, City ${i}`,
                        geolocation: `192.168.1.${i}, 192.168.1.${i}`,
                        price: Math.floor(Math.random() * 9000) + 1000,
                        area: Math.floor(Math.random() * 3000) + 500,
                        bedrooms: Math.floor(Math.random() * 5) + 1,
                        bathrooms: Math.floor(Math.random() * 5) + 1,
                        rating: Math.floor(Math.random() * 5) + 1,
                        facilities: selectedFacilities,
                        image: image,
                        agent: [assignedAgent.$id],
                        review: assignedReviews.map(review => review.$id),
                        gallery: assignedGalleries.map(gallery => gallery.$id)
                    }
                );

                console.log(`Seeded property: ${property.name} with ID: ${property.$id}`);
            } catch (error) {
                console.error(`Error creating property ${i}:`, error);
                throw error;
            }
        }

        console.log("Data seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
        throw error;
    }
}

export default seed;