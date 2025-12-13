export const formFields: Record<string, string[]> = {
    /**
     * Campos para criação e atualização de Usuário.
     * 'password' é usado apenas no POST (Registro) e PUT (Atualização de Senha).
     */
    user: ["id", "name", "email", "password", "role"], 

    /**
     * Campos básicos para Músicas (CRUD por Admin).
     */
    music: ["id", "name"], 

    /**
     * Campos para Playlist (Criação e Atualização).
     * O 'id' do dono (id_user) é obtido automaticamente do JWT no backend.
     */
    playlist: ["id", "name", "description"], 

    /**
     * Campos para Avaliações (Ratings).
     * O 'id_user' é obtido do JWT. O 'id_playlist' é passado via URL/parâmetro.
     */
    rating: ["id", "stars", "review", "id_playlist", "id_user"], 
    
    // ----------------------------------------------------
    // ROTAS DE AUTENTICAÇÃO
    // ----------------------------------------------------

    /**
     * Campos necessários para a tela de Login.
     */
    login: ["email", "password"],
    
    /**
     * Campos para o registro de um novo usuário.
     */
    register: ["name", "email", "password"],

    // ----------------------------------------------------
    // TABELAS DE ASSOCIAÇÃO (Se forem manipuladas diretamente)
    // ----------------------------------------------------

    /**
     * Associação de Música com Playlist (Adicionar/Remover Músicas).
     */
    "playlist-music": ["id_playlist", "id_music"], 

    /**
     * Associação de Usuário com Playlist (Quem é o dono da playlist).
     * Geralmente não manipulada diretamente pelo formulário, mas útil para mapeamento.
     */
    "user-playlist": ["id_user", "id_playlist"], 
};

