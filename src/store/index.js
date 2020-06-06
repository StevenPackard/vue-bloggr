import Vue from "vue";
import Vuex, { Store } from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blargs: [],
    activeBlarg: {},
    comments: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlargs(state, blargs) {
      state.blargs = blargs;
    },
    setActiveBlarg(state, blarg) {
      state.activeBlarg = blarg;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    deleteComment(state, id) {
      state.comments = state.comments.filter((c) => c.id != id);
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllBlargs({ commit, dispatch }) {
      try {
        let res = await api.get("blogs");
        commit("setBlargs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBlargDetails({ commit, dispatch }, id) {
      try {
        let res = await api.get("blogs/" + id);
        commit("setActiveBlarg", res.data);
        console.log(this.state.activeBlarg);
      } catch (error) {
        console.error(error);
      }
    },
    async createBlarg({ commit, dispatch }, blargDeetz) {
      try {
        let res = await api.post("blogs", blargDeetz);
        dispatch("getAllBlargs");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBlarg({ commit, dispatch }, id) {
      try {
        let res = await api.delete("blogs/" + id);
        router.push({ name: "Home" });
      } catch (error) {
        console.error(error);
      }
    },
    async getComments({ commit, dispatch }, id) {
      try {
        let res = await api.get("blogs/" + id);
        commit("setComments", res.data.comments);
      } catch (error) {
        console.error(error);
      }
    },
    async createComment({ commit, dispatch }, commentDeetz) {
      try {
        let res = await api.post("comments", commentDeetz);
        commit("addComment", res.data);
        dispatch("getComments");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit, dispatch }, id) {
      try {
        let res = await api.delete("comments/" + id);
        commit("deleteComment", id);
        dispatch("getComments");
      } catch (error) {
        console.error(error);
      }
    },
  },
});
