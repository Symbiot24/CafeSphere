const mongoose = require("mongoose");
const User = require("./models/user.js");
const Cafe = require("./models/cafe.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Cafesphere");
}

main().then(() => {
    console.log("connection successfull");
}).catch((err) => console.log(err));


let allCafe = [
    {
        cafeName: "Sangam Cafe",
        ownerName: "Raj singh",
        image: "https://img.freepik.com/premium-photo/cafe-with-large-window-table-with-chairs_728472-653.jpg",
        location: "Bhel Colony, Near Piplani",
        city: "Bhopal",
        contactNo: 9123567899,
    },
    {
        cafeName: "Royal Cafe",
        ownerName: "Mohan pal",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3eQUorKfAOwtAmzmoXlLi1-qCAm6uO08tAw&s",
        location: "Indrapuri, Bhel",
        city: "Bhopal",
        contactNo: 7573567099,
    },
    {
        cafeName: "Sagar Gaire Restaurant",
        ownerName: "Mulayam thapa",
        image: "https://bestfranchiseconnect.com/wp-content/uploads/2024/10/Sagar-Gaire-resturant-1024x536.jpg",
        location: "Bhavani Dham, Narela",
        city: "Bhopal",
        contactNo: 9112267899,
    },
    {
        cafeName: "Momo Cafe",
        ownerName: "Siddarth gupta",
        image: "https://www.author.thinkwithniche.com/allimages/project/thumb_0c216wow-momos.jpg",
        location: "Db City, Arera Hills",
        city: "Bhopal",
        contactNo: 6263468900,
    },
    {
        cafeName: "Bake N Shake",
        ownerName: "Kiran bedi",
        image: "https://cdnassets.hw.net/bf/0f/70d237b147af9c30a0e78fb20685/c6493ebb4f27476f9da41b778075d88d.jpg",
        location: "Rangmahal Cineplex",
        city: "Bhopal",
        contactNo: 7899102921,
    },
    {
        cafeName: "Shahnama",
        ownerName: "Abdul karim",
        image: "https://img.freepik.com/premium-photo/coffee-shop_635702-1804.jpg",
        location: "6 Manohar Hamidia Road",
        city: "Bhopal",
        contactNo: 6725341322,
    },
    {
        cafeName: "Fusion Cafe",
        ownerName: "Vinayak Dwivedi",
        image: "https://b.zmtcdn.com/data/pictures/6/19814996/ac6b9b7ffd0454a06321a3fa845c85a3.jpg?fit=around|960:500&crop=960:500;*,*",
        location: "E-8 Extension, Gulmohar Colony",
        city: "Bhopal",
        contactNo: 9235867611,
    },
    {
        cafeName: "Cafe-Chino",
        ownerName: "Rahul baghel",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZsvV12aEavqBFqrMrdLaldJ8LzIdfKwxF6Q&s",
        location: "157 Jehen Numa Palace, Shamla hills",
        city: "Bhopal",
        contactNo: 6263651120,
    },
    {
        cafeName: "Green House Bistro",
        ownerName: "Aman chauraisa",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/b3/82/f2/exterior-of-the-greenhouse.jpg?w=1200&h=-1&s=1",
        location: "Jehan Numa Retreat, Near Van Vihar",
        city: "Bhopal",
        contactNo: 7611903520,
    }
]

Cafe.insertMany(allCafe);



// Inserrting User

// let allUser = [
//     {
//         name: "Raj singh",
//         contactNo: 7656971029,
//         email: "raj24@gmail.com",
//         password: "raj123",
//         address: "gurgaon, Haryana"
//     },
//     {
//         name: "mohan modi",
//         contactNo: 6362091129,
//         email: "mohan571@gmail.com",
//         password: "mohan123",
//         address: "mumbai, Maharastra"
//     },
//     {
//         name: "John doe",
//         contactNo: 7619203933,
//         email: "johndoe221@gmail.com",
//         password: "john123",
//         address: "jabalpur, Madhya Pradesh"
//     }
// ];

// User.insertMany(allUser);