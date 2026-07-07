export interface EvolutionWebhookPayload {
  data: {
    Info: {
      PushName: string;
      Sender: string;
      IsFromMe: boolean;
    };

    Message: {
      conversation?: string;
    };
  };
}
