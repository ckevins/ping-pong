
<template>
    <Chart id="blah" type="pie" :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  chartData: Array,
  chartLabels: Array
});

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: props.chartLabels,
        datasets: [
            {
                data: props.chartData,
                backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')].slice(0, props.chartData?.length),
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')].slice(0, props.chartData?.length)
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    color: textColor,
                }
            }
        }
    };
};
</script>

<style scoped>
#blah {
    max-height: 200px;
}
</style>
