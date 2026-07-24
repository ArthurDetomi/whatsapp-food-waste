export interface DetectedFood {
  /**
   * Nome do alimento identificado.
   */
  name: string;

  /**
   * Estimativa de validade ou tempo restante para consumo.
   * Pode ficar indefinido quando não for possível estimar.
   */
  estimatedExpiration?: string;

  /**
   * Nível de confiança da identificação ou estimativa (0 a 100).
   */
  confidence: number;

  /**
   * Observações relevantes sobre conservação, aparência,
   * armazenamento ou sinais de deterioração.
   */
  observations?: string;
}
