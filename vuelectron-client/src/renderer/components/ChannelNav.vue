<template>
  <nav id="channelNav">
      <div id="nameSpace">
        <img src="../assets/profile.png">
        <span >{{ data.name }}</span>
      </div>
      <div id="channelSpace">
        <div id="span_channels">CHANNELS</div>
        <div id="add_channel">
          <img src="../assets/plus.png">
        </div>
      </div>
      <span class="asType">AS USER</span>
      <div class="channels" id="asAdminNav">
        
      </div>
      <span class="asType">AS ADMIN</span>
      <div class="channels" id="asUserNav"></div>
    </nav>
</template>
<script>
export default {
  name: 'ChannelNav',
  props: ['data'],
  mounted: function () {
    console.log(this.data.name)
    console.log('mounted!')
  }
}
</script>

<style scoped>
#channelSpace {
  width: 100%;
  height: 5%;
  border-bottom: 0.5px solid black;
}

#span_channels {
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: lighter;
  color: darkgray;
  width: 70%;
  height: 100%;
  text-align: center;
  line-height: 37px;
  float: left;
}

.asType {
    font-size: 16px;
    font-family: Helvetica, sans-serif;
    font-weight: lighter;
    color: darkgray;
    width: 100%;
    height: 4%;
    display: inline-block;
    text-align: center;
    margin-top: 5px;
    border-bottom: 0.5px solid black;
    
}

#add_channel {
  width: 30%;
  height: 100%;
  float: right;
  display: table;
}

#add_channel img {
  width: 25px;
  height: 25px;
  margin-top: 5px;
}

#channelNav {
  width: 15%;
  height: 100%;
  border-right: 0.1vw solid black;
  display: inline-block;
  float: left;
}

#nameSpace {
  padding-top: 20px;
  width: 100%;
  height: 20%;
  border-bottom: 0.5px solid black;
}

#nameSpace span {
  margin-top: 10px;
  font-size: 25px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  color: black;
  text-align: center;
  display: block;
}

#nameSpace img{
  margin-top: 10%;
  margin-left: 35%;
}

.channels {
  width: 100%;
  height: 33%;
  overflow-y: scroll;
  border-bottom: 0.5px solid black;
}

.channels:nth-of-type(2) {
  border-bottom: 0.5px solid black;
}

#channel_item {
  width: 100%;
  height: 500px;
}
</style>
