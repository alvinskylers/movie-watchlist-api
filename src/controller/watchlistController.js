import { prisma } from "../config/db.js"

const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;
    
    const movie = await prisma.movie.findUnique({
        where: {id: movieId},
    });

    if (!movie) {
        return res.status(404).json({ error: "movie not found"});
    }

    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId,
            },
        },
    });

    if (existingInWatchlist) {
        return res.status(400).json({ error: "movie is already in watchlist!"});
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data:{
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        },
    });

    return res.status(201).json({
        status: "success",
        data: {
            watchlistItem
        }
    });
};

const removeFromWatchlist = async (req, res) => {
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id},
    });

    if (!watchlistItem) {
        return res
            .status(404)
            .json({ error: "Watchlist item not found"});
    }

    if (watchlistItem.userId !== req.user.id) {
        return res
            .status(403)
            .json({ error: "Not allowed to remove this watchlist item"});
    }

    await prisma.watchlistItem.delete({
        where: {id: req.params.id},
    });

    return res
        .status(200)
        .json({ 
            status: "success", 
            message: "watchlist item removed successfully"});
}

export { addToWatchlist, removeFromWatchlist}