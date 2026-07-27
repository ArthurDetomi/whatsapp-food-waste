import { DetectedFood } from "./DetectedFood.js";

export interface AIResponse {
  /**
   * Mensagem que será enviada ao usuário.
   */
  message: string;

  /**
   * Lista de alimentos a serem apresentados ao usuário.
   *
   * Quando omitida, significa que a resposta não precisa exibir
   * uma lista de alimentos.
   */
  detectedFoods?: DetectedFood[];
}
