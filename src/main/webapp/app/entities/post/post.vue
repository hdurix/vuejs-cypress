<template>
    <div data-e2e-container="post-page">
        <h2 id="page-heading">
            <span v-text="$t('vueApp.post.home.title')" id="post-heading" data-e2e-element="post-heading">Posts</span>
            <router-link :to="{name: 'PostCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-post" data-e2e-element="create-entity">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('vueApp.post.home.createLabel')">
                    Create new Post
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && posts && posts.length === 0">
            <span v-text="$t('vueApp.post.home.notFound')">No posts found</span>
        </div>
        <div class="table-responsive" v-if="posts && posts.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('vueApp.post.name')">Name</span></th>
                    <th><span v-text="$t('vueApp.post.age')">Age</span></th>
                    <th><span v-text="$t('vueApp.post.user')">User</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="post in posts"
                    :key="post.id">
                    <td>
                        <router-link :to="{name: 'PostView', params: {postId: post.id}}">{{post.id}}</router-link>
                    </td>
                    <td>{{post.name}}</td>
                    <td>{{post.age}}</td>
                    <td>
                        {{post.user ? post.user.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link
                                    :to="{name: 'PostView', params: {postId: post.id}}"
                                    tag="button"
                                    class="btn btn-info btn-sm details"
                                    data-e2e-element="details-button">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link
                                    :to="{name: 'PostEdit', params: {postId: post.id}}"
                                    tag="button"
                                    class="btn btn-primary btn-sm edit"
                                    data-e2e-element="edit-button">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(post)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity
                                   data-e2e-element="delete-button">
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" data-e2e-container="post-delete">
            <span slot="modal-title"><span id="vueApp.post.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-post-heading" v-bind:title="$t('vueApp.post.delete.question')" data-e2e-element="title">Are you sure you want to delete this Post?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-post" v-text="$t('entity.action.delete')" v-on:click="removePost()" data-e2e-element="confirm">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./post.component.ts">
</script>
