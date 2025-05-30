import prisma from "@/lib/prisma";

interface CreateParams {
  name: string;
}

interface ReadParams {
  id: string;
}

interface UpdateParams {
  id: string;
  name: string;
}

class ChatService {
    
  async createChat({ name }: CreateParams) {
    try {
      const chat = await prisma.chat.create({
        data: {
          name: name,
        },
      });
      return chat;
    } catch (error) {
      console.error("Erro ao criar chat:", error);
      throw new Error("Erro ao criar chat");
    }
  }

  async readChat({ id }: ReadParams) {
    try {
      const chat = await prisma.chat.findUnique({
        where: { id: id },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
      return chat;
    } catch (error) {
      console.error("Erro ao buscar chat:", error);
      throw new Error("Erro ao buscar chat");
    }
  }

  async readMostRecentChat() {
    try {
      const chat = await prisma.chat.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });
      return chat;
    } catch (error) {
      console.error("Erro ao buscar chat mais recente:", error);
      throw new Error("Erro ao buscar chat mais recente");
    }
  }

  async readAllChats() {
    try {
      const chats = await prisma.chat.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return chats;
    } catch (error) {
      console.error("Erro ao buscar todos os chats:", error);
      throw new Error("Erro ao buscar todos os chats");
    }
  }

  async updateChat({ id, name }: UpdateParams) {
    if (!id || !name) {
      throw new Error("ID e nome são obrigatórios para atualizar o chat.");
      }
    try {
      const chat = await prisma.chat.update({
        where: { id: id },
        data: { name: name },
      });
      return chat;
    } catch (error) {
      console.error("Erro ao atualizar chat:", error);
      throw new Error("Erro ao atualizar chat");
    }
  }

  async deleteChat({ id }: ReadParams) {
    try {
      const chat = await prisma.chat.delete({
        where: { id: id },
      });
      return chat;
    } catch (error) {
      console.error("Erro ao deletar chat:", error);
      throw new Error("Erro ao deletar chat");
    }
  }
}

export { ChatService };
