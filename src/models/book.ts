import { Sort } from "../components/common/SortSelector";
import { Appointment } from "./appointment";
import { Doctor } from "./doctor";

export interface Book {
    _id: string;
    title: string;
    coverImage: string;
    author: Appointment | string;
    genre: Doctor | string;
    rating: number;
    yearPublished: number;
    description: string;
    numberInStock: number;
}

export interface BookQuery {
    author?: string;
    genre?: string;
    search?: string;
    sortBy?: string;
    populate?: string;
}

export const defaultBookCover = "/src/assets/default-no-cover.jpeg";

export const bookSortFields: Sort[] = [
    { name: "Date Added", value: "-_id" },
    { name: "Title", value: "title" },
    { name: "Rating", value: "-rating" },
    { name: "Year Published", value: "-yearPublished" },
];
