import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BakeryDescription } from "../../types/TypeBakeryDescription";
import { BakerySearchQuery } from "../../types/TypeBakerySearchQuery";
import { BakeryGetApi } from "../../types/TypeBakeryGetApi";


/**CSS *******************************************/
const DivSearchedResultItem = styled.div`
    border-bottom: 0.5px solid #fff;
    padding: 20px 0px;
`
const H2SearchedResultItemTitle = styled.h2`
    color: #fff;
    font-weight: normal;
    font-size: 1.3em;
    margin: 0px 0px 10px 0px;
`;
const ImgSearchedResultItemPhoto = styled.img`
    margin: 5px 10px;
`;
const ButtonSearchedResultAdd = styled.button`
    color: #fff;
    background-color: #415682;
    font-size: 15px;
    padding: 10px;
    margin: 10px;
    border-radius: 3px;
`;
const DivSearchedResultItemAdd = styled.div`
    &:hover {
        ${ButtonSearchedResultAdd} {
            background-color: #1d2538;
            cursor: pointer;
        }
    }
`;
/**CSS end****************************************/

type BakerySearchProps = {
    description: BakeryGetApi;
    onBakeryAdd: (bakery: BakeryGetApi) => void;
};

const SearchBakery = (props: BakerySearchProps) => {
    const { name, station, photo_forPC } = props.description;
    // The counter of "Add to List" button pressed
    const [addListCnt, setAddListCnt] = useState<number>(0);

    const addBakeryClickHandler = () => {
        // Increment when "Add to List" button is pressed.
        setAddListCnt(prevState => prevState + 1);
        // Add addListCnt to make shop.id (= key of the list) unique 
        props.description.id += addListCnt.toString();
        props.onBakeryAdd(props.description);
    };

    return (
        <DivSearchedResultItem className="searchBakery">
            <H2SearchedResultItemTitle title={name}>{name}</H2SearchedResultItemTitle>
            <div className="station" title={station}>station: {station}</div>
            <ImgSearchedResultItemPhoto src={photo_forPC} alt="" />
            <DivSearchedResultItemAdd className="add-bakery" onClick={addBakeryClickHandler}>
                <ButtonSearchedResultAdd>+ Add to the List</ButtonSearchedResultAdd>
            </DivSearchedResultItemAdd>
        </DivSearchedResultItem>
    );
};

export default SearchBakery;