<template>
    <div id="main">
        <TitleHeader/>
        <div id="main-area">
            <div id="profile-area" class="inner-main-area">
                <div id="profile-img">
                    <img src="../assets/profile-img-sample.png" alt="" id="btn-plus">
                </div>
                <div id="name-area">
                    윤찬띵
                </div>
                <div id="channels">
                    CHANNELS
                    <img src="../assets/plus.svg" alt="">
                </div>
            </div>
            <div id="channel-area" class="inner-main-area">

            </div>
            <div id="content-area" class="inner-main-area">

            </div>
        </div>
    </div>
</template>
<script>
  import TitleHeader from '../components/Header'

  export default {
    name: 'Main',
    components: {
      TitleHeader
    }
  }
</script>
<style scoped>
    #main {
        width: 100%;
        height: 100%;
        background: rgb(242, 242, 242)
    }

    #main-area {
        width: 100%;
        height: calc(100% - 50px);
        padding: 30px;
        display: flex;
        justify-content: space-between;
    }

    .inner-main-area {
        height: 100%;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: rgb(255, 255, 255);
        border-radius: 5px;
    }

    #profile-area {
        width: 20%;
        display: flex;
        justify-content: space-around;
    }

    #profile-img {
        border-radius: 50%;
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 1px solid black;
    }

    #profile-img > img {
        width: 100%;
    }

    #channels {
        width: 90%;
        height: 40px;
        font-size: 23px;
        line-height: 40px;
        position: relative;
        text-align: center;
        box-shadow: 0 0 5px 3px #cacaca;
        font-weight: 500;
        border-radius: 2px;
        color: rgb(143, 143, 143);
    }

    #channels > img {
        height: 23px;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }

    #name-area {
        text-align: center;
        width: 90%;
        font-size: 23px;
        font-weight: 500;
        color: rgb(27, 27, 27);
    }

    #channel-area {
        width: 18%;
    }

    #content-area {
        width: 57.5%;
    }
</style>

