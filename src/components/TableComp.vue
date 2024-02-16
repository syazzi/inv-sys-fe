<template>
  <v-simple-table fixed-header>
        <thead>
          <tr>
            <th class="text-center subtitle-2 font-weight-bold" v-for="(header,index) in headers" :key="index">{{ header.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="$emit('addTable', item)" v-for="(item, index) in items" :key="index" class="text-center subtitle-1">
            <td v-for="(header,index) in headers" :key="index">{{ item.attributes[header.key] }}</td>
          </tr>
        </tbody>
      </v-simple-table>
</template>

<script>
export default {
    props:['items', 'headers'],
}
</script>

<style>

</style>