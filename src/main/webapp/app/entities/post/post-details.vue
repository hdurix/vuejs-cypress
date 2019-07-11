<template>
    <div class="row justify-content-center" data-e2e-container="post-details-page">
        <div class="col-8">
            <div v-if="post">
                <h2 class="jh-entity-heading"><span v-text="$t('vueApp.post.detail.title')" data-e2e-element="title">Post</span> {{post.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('vueApp.post.name')">Name</span>
                    </dt>
                    <dd>
                        <span data-e2e-element="details-item">{{post.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('vueApp.post.age')">Age</span>
                    </dt>
                    <dd>
                        <span data-e2e-element="details-item">{{post.age}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('vueApp.post.user')">User</span>
                    </dt>
                    <dd>
                        {{post.user ? post.user.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info"
                        data-e2e-element="back">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="post.id" :to="{name: 'PostEdit', params: {postId: post.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./post-details.component.ts">
</script>
