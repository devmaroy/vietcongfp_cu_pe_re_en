import React from 'react';

// Create Paragraphs
// Very simple helper function
//
// Should Create <p></p> tag based on new line.

export const createParagraphs = ( text ) => {
    if ( text ) {
        return text.split( '\n' )
            .map( ( item, key ) => <p key={ key }>{ item }</p> )
    }
}



// Limit Text
// Very simple helper function
//
// Should Limit text by specified amount of words

export const limitText = ( text, limit = 80, includeDots = true ) => {
    // Split text
    const splitText = text.split( " " );

    // Create new limited text
    const newText = splitText.splice( 0, limit ).join( " " );
    
    // Add dots based on condition
    const dots = ( splitText.length > limit && includeDots ) ? '...' : '';

    return newText + dots;
};