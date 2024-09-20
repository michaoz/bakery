import { BakeryGetApi } from "./TypeBakeryGetApi";

export type PropsTypeMapBakeriesTable = {
    bakeryList: BakeryGetApi[];
    detailClick: (e: React.MouseEvent<HTMLButtonElement>, bakeryId: string) => void;

}