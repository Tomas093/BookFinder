export interface Author {
    id: number;           // Changed from string to number
    name: string;
    birthDate: Date;      // Maps to birth_date in DB
}