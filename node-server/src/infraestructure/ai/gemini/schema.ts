export const aiResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description: "Resposta em linguagem natural que será enviada ao usuário.",
    },

    detectedFoods: {
      type: "array",
      description: "Alimentos identificados ou mencionados na solicitação.",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nome do alimento identificado.",
          },

          estimatedExpiration: {
            type: "string",
            description:
              "Estimativa de validade ou tempo restante de consumo. Deve ficar vazio quando não for possível estimar.",
          },

          confidence: {
            type: "number",
            description:
              "Nível de confiança da identificação ou estimativa, entre 0 e 100.",
          },

          observations: {
            type: "string",
            description:
              "Observações relevantes sobre conservação, aparência ou armazenamento.",
          },
        },

        required: ["name", "confidence"],
      },
    },
  },

  required: ["message", "detectedFoods"],
};
