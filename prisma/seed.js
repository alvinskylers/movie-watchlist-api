import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const userId = "f948bad5-5a03-4557-adab-a3ad299ca59a";

const movies =[
  {
    "title": "The Shawshank Redemption",
    "overview": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "releaseYear": 1994,
    "genres": ["Drama"],
    "runtime": 142,
    "posterUrl": "https://example.com/shawshank.jpg",
    "createdBy": userId
  },
  {
    "title": "Inception",
    "overview": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    "releaseYear": 2010,
    "genres": ["Action", "Sci-Fi", "Adventure"],
    "runtime": 148,
    "posterUrl": "https://example.com/inception.jpg",
    "createdBy": userId
  },
  {
    "title": "The Godfather",
    "overview": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "releaseYear": 1972,
    "genres": ["Crime", "Drama"],
    "runtime": 175,
    "posterUrl": "https://example.com/godfather.jpg",
    "createdBy": userId
  },
  {
    "title": "Pulp Fiction",
    "overview": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence.",
    "releaseYear": 1994,
    "genres": ["Crime", "Drama"],
    "runtime": 154,
    "posterUrl": "https://example.com/pulpfiction.jpg",
    "createdBy": userId
  },
  {
    "title": "The Dark Knight",
    "overview": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests.",
    "releaseYear": 2008,
    "genres": ["Action", "Crime", "Drama"],
    "runtime": 152,
    "posterUrl": "https://example.com/darkknight.jpg",
    "createdBy": userId
  },
  {
    "title": "Parasite",
    "overview": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    "releaseYear": 2019,
    "genres": ["Thriller", "Drama"],
    "runtime": 132,
    "posterUrl": "https://example.com/parasite.jpg",
    "createdBy": userId
  },
  {
    "title": "Spirited Away",
    "overview": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    "releaseYear": 2001,
    "genres": ["Animation", "Adventure", "Fantasy"],
    "runtime": 125,
    "posterUrl": "https://example.com/spiritedaway.jpg",
    "createdBy": userId
  },
  {
    "title": "Interstellar",
    "overview": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "releaseYear": 2014,
    "genres": ["Adventure", "Drama", "Sci-Fi"],
    "runtime": 169,
    "posterUrl": "https://example.com/interstellar.jpg",
    "createdBy": userId
  },
  {
    "title": "The Matrix",
    "overview": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    "releaseYear": 1999,
    "genres": ["Action", "Sci-Fi"],
    "runtime": 136,
    "posterUrl": "https://example.com/matrix.jpg",
    "createdBy": userId
  },
  {
    "title": "Gladiator",
    "overview": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    "releaseYear": 2000,
    "genres": ["Action", "Adventure", "Drama"],
    "runtime": 155,
    "posterUrl": "https://example.com/gladiator.jpg",
    "createdBy": userId
  }
];

const main = async () => {
    console.log("Seeding movies...");

    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });
        console.log(`Seeding for ${movie.title} completed`);
    };
    console.log(`Seeding completed!`);
} 

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });