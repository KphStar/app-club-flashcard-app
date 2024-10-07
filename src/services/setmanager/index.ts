import { appDirectoryName, fileEncoding } from "../../shared/constants";
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { GetFlashCards } from "../../shared/types";

export const getFlashcardsDir = () => {
    return `../../../${appDirectoryName}`;
}

export const getFlashcards : GetFlashCards = async () => {
    const fcDir = getFlashcardsDir();

    await ensureDir(fcDir);

    const fcFileNames = await readdir(fcDir, {
        encoding: fileEncoding,
        withFileTypes: false
    });

    const flashcards = fcFileNames.filter((fileName) => fileName.endsWith('.json'));

    return Promise.all(flashcards.map(getFlashcardInfoFromFileName));
}

export const getFlashcardInfoFromFileName = async (filename: string): Promise<any> => {
    
    const filePath = `${getFlashcardsDir()}/${filename}`;

    const fileContent = await readFile(filePath, { encoding: fileEncoding });

    const flashcardData = JSON.parse(fileContent);

    return {
        title: filename.replace(/\.json$/, ''),
        content: flashcardData,
    }
}