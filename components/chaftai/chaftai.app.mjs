import { axios } from "@pipedream/platform";

export default {
  type: "app",
  app: "chatfai",
  propDefinitions: {
    characterId: {
      type: "string",
      label: "Character ID",
      description: "ID of a public ChatFAI character",
    },
    conversation: {
      type: "string[]",
      label: "Conversation",
      description: "The current chat conversation as an array of JSON strings",
    },
    name: {
      type: "string",
      label: "Character Name",
      description: "The name of the character you want",
      optional: true,
    },
    bio: {
      type: "string",
      label: "Character Bio",
      description: "The bio of the character you want",
      optional: true,
    },
    includeVoice: {
      type: "boolean",
      label: "Include Voice",
      description: "Set to true if you want to generate voice message",
      default: false,
      optional: true,
    },
    useInternalOptimizations: {
      type: "boolean",
      label: "Use Internal Optimizations",
      description: "Set to false if you want to disable internal optimizations for memory and reply quality",
      default: true,
      optional: true,
    },
    searchQuery: {
      type: "string",
      label: "Search Query",
      description: "The search query to find public characters",
      optional: true,
    },
  },
  methods: {
    _baseUrl() {
      return "https://api.chatfai.com/v1";
    },
    async _makeRequest(opts = {}) {
      const {
        $ = this,
        method = "GET",
        path,
        headers,
        ...otherOpts
      } = opts;
      return axios($, {
        ...otherOpts,
        method,
        url: this._baseUrl() + path,
        headers: {
          ...headers,
          "Authorization": `Bearer ${this.$auth.oauth_access_token}`,
        },
      });
    },
    async generateMessageReply({
      characterId, conversation, name, bio, includeVoice, useInternalOptimizations,
    }) {
      const body = {
        character_id: characterId,
        conversation: conversation.map(JSON.parse),
        name,
        bio,
        include_voice: includeVoice,
        use_internal_optimizations: useInternalOptimizations,
      };
      return this._makeRequest({
        method: "POST",
        path: "/chat",
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      });
    },
    async getPublicCharacterById({ characterId }) {
      return this._makeRequest({
        path: `/characters/${characterId}`,
      });
    },
    async searchPublicCharacters({ searchQuery }) {
      return this._makeRequest({
        path: "/characters/search",
        params: {
          query: searchQuery,
        },
      });
    },
  },
  version: "0.0.{{ts}}",
};
