export interface Cardset {
    title: string;
    setId: string;
    description: string;
    reminderTime: Date | null;
    numCards: number; //the card ids that belong to this set
}

export interface Flashcard {
    cardId: string;
    question: string;
    answer: string;
    confidence: 0 | 1 | 2; //0 = did not know | 1 = sorta know | 2 = did know
}