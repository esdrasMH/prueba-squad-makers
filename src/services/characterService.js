export const characterService = {
    async getCharacters(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Falló la petición");
            }
            return await response.json();
        } catch (error) {
            console.error("Error al solicitar personajes:", error);
            throw error;
        }
    }
};