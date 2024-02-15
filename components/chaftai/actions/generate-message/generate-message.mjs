import chatfai from "../../chatfai.app.mjs";
import { axios } from "@pipedream/platform";

export default {
  key: "chaftai-generate-message-reply",
  name: "Generate Message Reply",
  description: "Generates a message reply using a ChatFAI character. [See the documentation](https://chatfai.com/developers/docs#tag/chat/paths/~1chat/post)",
  version: "0.0.{{ts}}",
  type: "action",
  props: {
    chatfai,
    characterId: {
      propDefinition: [
        chatfai,
        "characterId",
      ],
    },
    conversation: {
      propDefinition: [
        chatfai,
        "conversation",
      ],
    },
    name: {
      propDefinition: [
        chatfai,
        "name",
        (c) => ({
          optional: true,
        }),
      ],
    },
    bio: {
      propDefinition: [
        chatfai,
        "bio",
        (c) => ({
          optional: true,
        }),
      ],
    },
    includeVoice: {
      propDefinition: [
        chatfai,
        "includeVoice",
        (c) => ({
          optional: true,
          default: false,
        }),
      ],
    },
    useInternalOptimizations: {
      propDefinition: [
        chatfai,
        "useInternalOptimizations",
        (c) => ({
          optional: true,
          default: true,
        }),
      ],
    },
  },
  async run({ $ }) {
    const response = await this.chatfai.generateMessageReply({
      characterId: this.characterId,
      conversation: this.conversation.map(JSON.parse),
      name: this.name,
      bio: this.bio,
      includeVoice: this.includeVoice,
      useInternalOptimizations: this.useInternalOptimizations,
    });

    $.export("$summary", "Generated a message reply successfully");
    return response;
  },
};
