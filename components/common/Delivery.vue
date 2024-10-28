<script lang="ts" setup>
const deliveryData = [
  { route: 'Нижний Новгород', gazelle: 3000, valday_4_5: 5000, valday_3_5: 8000, maz: 12000 },
  { route: 'Арзамас', gazelle: 9000, valday_4_5: 10000, valday_3_5: 12000, maz: 19000 },
  { route: 'Балахна', gazelle: 4000, valday_4_5: 5000, valday_3_5: 7000, maz: 14000 },
  { route: 'Бор', gazelle: 4000, valday_4_5: 5000, valday_3_5: 7000, maz: 14000 },
  { route: 'Выкса', gazelle: 16000, valday_4_5: 17000, valday_3_5: 19000, maz: 26000 },
  { route: 'Городец', gazelle: 5000, valday_4_5: 6000, valday_3_5: 8000, maz: 17000 },
  { route: 'Дзержинск', gazelle: 4000, valday_4_5: 5000, valday_3_5: 7000, maz: 14000 },
  { route: 'Заволжье', gazelle: 5000, valday_4_5: 6000, valday_3_5: 8000, maz: 17000 },
  { route: 'Кстово', gazelle: 4000, valday_4_5: 5000, valday_3_5: 7000, maz: 14000 },
  { route: 'Кулебаки', gazelle: 16000, valday_4_5: 17000, valday_3_5: 19000, maz: 26000 },
  { route: 'Павлово', gazelle: 8000, valday_4_5: 9000, valday_3_5: 11000, maz: 16000 },
  { route: 'Саров', gazelle: 15000, valday_4_5: 16000, valday_3_5: 18000, maz: 26000 },
]

const columns = [
  { key: 'route', label: 'Маршрут' },
  { key: 'gazelle', label: 'Газель 6м', hint: 'до 1,5 тн, борт 6 мп' },
  { key: 'valday_4_5', label: 'Валдай 6м', hint: 'до 4,5 тн, борт 6 мп)' },
  { key: 'valday_3_5', label: 'Валдай 12м', hint: 'до 3,5 тн, борт 12 мп)' },
  { key: 'maz', label: 'МАЗ 12м', hint: 'до 20 тн, борт 12 мп)' },
]
</script>

<template>
  <div>
    <p>
      Доставка осуществляется в течение 3-х дней после оплаты счета, при условии наличии товара на складе. Время доставки заказных или производственных позиции - уточняйте у менеджера. Осуществляем доставку по Нижнему Новгороду, Нижегородской области и в другие регионы России.
    </p>
    <p>
      Стоимость зависит от адреса доставки, веса и габарита товара. Далее в таблицы указаны минимальные цены на доставку (цена в рублях с НДС):
    </p>
    <UTable
      :columns="columns"
      :rows="deliveryData"
    >
      <template #gazelle-header="{ column }">
        <UTooltip
          :text="column.hint"
          :popper="{ placement: 'top' }"
        >
          <UButton
            icon="i-mdi-information"
            size="sm"
            color="black"
            variant="link"
            :label="column.label"
            :trailing="true"
          />
        </UTooltip>
      </template>
      <template #valday_4_5-header="{ column }">
        <UTooltip
          :text="column.hint"
          :popper="{ placement: 'top' }"
        >
          <UButton
            icon="i-mdi-information"
            size="sm"
            color="black"
            variant="link"
            :label="column.label"
            :trailing="true"
          />
        </UTooltip>
      </template>
      <template #valday_3_5-header="{ column }">
        <UTooltip
          :text="column.hint"
          :popper="{ placement: 'top' }"
        >
          <UButton
            icon="i-mdi-information"
            size="sm"
            color="black"
            variant="link"
            :label="column.label"
            :trailing="true"
          />
        </UTooltip>
      </template>
      <template #maz-header="{ column }">
        <UTooltip
          :text="column.hint"
          :popper="{ placement: 'top' }"
        >
          <UButton
            icon="i-mdi-information"
            size="sm"
            color="black"
            variant="link"
            :label="column.label"
            :trailing="true"
          />
        </UTooltip>
      </template>
    </UTable>
  </div>
</template>
