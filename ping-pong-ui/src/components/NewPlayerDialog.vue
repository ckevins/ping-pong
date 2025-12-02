<template>
  <div class="card flex justify-center">
    <Button id="new-player-btn" @click="visible = true">New Player</Button>
    <Dialog v-model:visible="visible" modal header="New Player" :style="{ width: '25rem' }" id="new-player-dialog">
      <section id="new-player-dialog-content">
        <IftaLabel>
          <InputText id="player-name" v-model="name" />
          <label for="player-name">Name</label>
        </IftaLabel>
        <div id="handedness-div">
          <div class="handedness-option">
            <RadioButton v-model="handedness" inputId="right" name="right" value="right" />
            <label for="right">Right</label>
          </div>
          <div class="handedness-option">
            <RadioButton v-model="handedness" inputId="left" name="left" value="left" />
            <label for="left">Left</label>
          </div>
        </div>
        <div id="actions-div">
          <Button type="button" label="Cancel" severity="secondary" @click="handleCancel"></Button>
          <Button :disabled="!name || !handedness" type="button" label="Add Player" @click="handleSave"></Button>
        </div>
      </section>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePingPongStore } from "../stores/ping-pong";
import { storeToRefs } from "pinia";

const store = usePingPongStore();
const { useTestUsers } = storeToRefs(store)

const visible = ref(false);
const name = ref();
const handedness = ref();

const emit = defineEmits(["player-added"]);

function resetFields () {
  name.value = null;
  handedness.value = null;
}

function handleCancel () {
  resetFields();
  visible.value = false;
}

async function handleSave () {
  try {
    const response = await fetch('/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.value, handedness: handedness.value, isTestUser: useTestUsers.value }),
    })
    console.log((await response.json()).message);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  emit('player-added');
  resetFields();
  visible.value = false;
}
</script>

<style scoped lang="scss">
button {
  font-family: 'Doto';
  font-weight: bold;
}

#new-player-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#player-name {
  width: 100%;
}

#handedness-div {
  display: flex;

  .handedness-option {
    margin-right: 20px;
    display: flex;
    gap: 5px;
  }
}

#actions-div {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  & > button {
    flex-grow: 1
  }
}
</style>