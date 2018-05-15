<template>
    <div id="application">
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
    html,
    body {
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        font-family: Arial, Helvetica, sans-serif;
    }

    * {
        box-sizing: border-box;
        border: 0;
    }

    #application {
        width: 100%;
        height: 100%;
    }

</style>
