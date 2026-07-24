import { DetectedFood } from "./DetectedFood.js";

export interface AIResponse {
  /**
   * Mensagem que será enviada ao usuário.
   */
  message: string;

  /**
   * Lista de alimentos identificados.
   */
  detectedFoods: DetectedFood[];
}
