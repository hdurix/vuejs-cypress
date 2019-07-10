<template>
    <div class="row justify-content-center" data-e2e-container="post-edit-page">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
                <h2
                    id="vueApp.post.home.createOrEditLabel"
                    v-text="$t('vueApp.post.home.createOrEditLabel')"
                    data-e2e-element="title">
                    Create or edit a Post
                </h2>
                <div>
                    <div class="form-group" v-if="post.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="post.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('vueApp.post.name')" for="post-name">Name</label>
                        <input type="text" class="form-control" name="name" id="post-name" data-e2e-element="post-name"
                            :class="{'valid': !$v.post.name.$invalid, 'invalid': $v.post.name.$invalid }" v-model="$v.post.name.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('vueApp.post.age')" for="post-age">Age</label>
                        <input type="number" class="form-control" name="age" id="post-age" data-e2e-element="post-age"
                            :class="{'valid': !$v.post.age.$invalid, 'invalid': $v.post.age.$invalid }" v-model.number="$v.post.age.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('vueApp.post.user')" for="post-user">User</label>
                        <select class="form-control" id="post-user" name="user" v-model="post.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="post.user && userOption.id === post.user.id ? post.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.post.$invalid || isSaving" class="btn btn-primary" data-e2e-element="save">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./post-update.component.ts">
</script>
