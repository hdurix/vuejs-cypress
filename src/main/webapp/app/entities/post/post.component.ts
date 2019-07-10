import { Component, Inject, Vue } from 'vue-property-decorator';
import { IPost } from '@/shared/model/post.model';
import AlertService from '@/shared/alert/alert.service';

import PostService from './post.service';

@Component
export default class Post extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('postService') private postService: () => PostService;
  private removeId: number = null;
  public posts: IPost[] = [];

  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllPosts();
  }

  public clear(): void {
    this.retrieveAllPosts();
  }

  public retrieveAllPosts(): void {
    this.isFetching = true;

    this.postService()
      .retrieve()
      .then(
        res => {
          this.posts = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IPost): void {
    this.removeId = instance.id;
  }

  public removePost(): void {
    this.postService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('vueApp.post.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllPosts();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
