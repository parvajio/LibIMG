import React from "react";
import { connectDB } from "@/lib/db";
import { Image } from "@/models/Image";
import { Container, Box } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import ImageGrid from "@/components/ImageGrid";
import { PageProps } from "next";

const page = async ({ searchParams }: PageProps["searchParams"]) => {
    const ITEMS_PER_PAGE = 6;
    const currentPage = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const searchTerm = searchParams?.search || "";

    await connectDB();

    const query = searchTerm
        ? {
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { shortDescription: { $regex: searchTerm, $options: "i" } },
            ],
        }
        : {};

    const images = await Image.find(query)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(ITEMS_PER_PAGE)
        .lean();

    const total = await Image.countDocuments(query);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    const serializedImages = images.map(image => ({
        _id: image._id ? image._id.toString() : "",
        createdAt: image.createdAt.toISOString(),
        url: image.url || "",
        name: image.name || "",
        shortDescription: image.shortDescription || "",
    }));

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <SearchBar defaultValue={searchTerm} />
            </Box>

            <ImageGrid images={serializedImages || []} />

            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        searchTerm={searchTerm}
                    />
                </Box>
            )}
        </Container>
    );
};

export default page;