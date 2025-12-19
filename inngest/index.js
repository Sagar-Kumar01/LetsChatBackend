import { Inngest } from "inngest";
import User from "../model/user.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "letsChat-app" });


//inngest function to sync user creation from clerk to our database
const syncUserCreation = inngest.createFunction(
    {id:'sync-user-creation'},
    {event:'clerk/user.created'},
    async ({ event }) => {
        const {id,first_name,last_name,email_address, image_url} = event.data;
        let username = email_address.split('@')[0];

        // check if user already exists in our database
        const existingUser = await User.findOne({ where: { clerkId: id } });

        if (existingUser) {
            username = username + Math.floor(Math.random() * 1000);
        }
        const userData = {
            _id: id,
            email: email_address,
            full_name: `${first_name} ${last_name}`,
            profile_picture: image_url,
            username
        }
        await User.create(userData);
    }
)
//inngest function to sync user updations from clerk to our database
const syncUserUpdations = inngest.createFunction(
    {id:'sync-user-updations'},
    {event:'clerk/user.updated'},
    async ({ event }) => {
        const {id,first_name,last_name,email_address, image_url} = event.data;

        const updateUserData = {
            email: email_address[0].email_address,
            full_name: `${first_name} ${last_name}`,
            profile_picture: image_url,
        }
        await User.findByIdAndUpdate(id, updateUserData);
    }
)

//inngest function to sync user deletion from clerk to our database
const syncUserDeletion = inngest.createFunction(
    {id:'sync-user-deletion'},
    {event:'clerk/user.deleted'},
    async ({ event }) => {
        const {id} = event.data;
        await User.findByIdAndDelete(id);
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserUpdations, syncUserDeletion];