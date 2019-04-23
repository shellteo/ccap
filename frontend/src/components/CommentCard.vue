<template>
    <div class="comment-item">
        <a class="user-avatar">
            <span class="avatar-wrap" style="width: 32px; height: 32px;">
                <img src="https://crypto-ycy.oss-cn-shanghai.aliyuncs.com/1/022.jpg" alt="avatar">
            </span>
        </a>
        <div class="main">
            <div class="comment-info">
                <div class="nickname-wrap">
                    <a class="nickname">{{comment.createUserName}}</a>
                </div>
            </div>
            <div class="comment-content">{{comment.content}}</div>
            <div class="comment-extra">{{formatTime}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommentCard",
        props: {
            comment: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {

        },
        computed: {
            formatTime() {
                return this.utils.formatDateTime(this.comment.createTime*1000, 'yyyy-MM-dd hh:mm:ss');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comment-item {
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .comment-info {
        margin-bottom: 6px;
    }
    .nickname-wrap {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 50%;
    }
    .nickname {
        font-size: 14px;
        font-weight: 700;
        vertical-align: middle;
        color: #484848;
    }
    .comment-content {
        font-size: 14px;
        line-height: 1.7;
        color: #484848;
        word-break: break-word!important;
    }
    .comment-extra {
        font-size: 12px;
        color: #969696;
        margin-top: 4px;
    }
    .user-avatar {
        float: left;
        margin-right: 12px;
    }
    .avatar-wrap {
        position: relative;
        background-color: transparent;
        transition: .4s linear;
        overflow: hidden;
        display: inline-block;
        border-radius: 50%;
        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .main {
        overflow: hidden;
    }
</style>
