<template>
  <nav
    class="breadcrumb has-pagination-separator"
    aria-label="breadcrumbs"
  >
    <ul>
      <li
        v-for="(item, idx) of items"
        :key="`breadcrumbs-list-${_uid}-${idx}`"
        :class="{ 'is-active': (idx + 1) === items.length }"
      >
        <component
          :is="item.to ? 'router-link' : item.href ? 'a' : 'span'"
          :to="item.to"
          :href="item.href"
          :title="item.title"
        >
          {{ item.name }}
        </component>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'SBreadcrumbs',
  props: {
    items: {
      type: Array,
      default: () => [{ name: 'Home', route: { name: 'home' } }]
    }
  }
}
</script>

<docs>
### Playground

```
<s-breadcrumbs :items="[{ name: 'hello', href: '/home' }, { name: 'salut' }]" />
```
</docs>

<style lang="scss">
@import 'src/scss/variables/_colors';

.breadcrumb {
  &.has-pagination-separator {
    ul {
      align-items: center;
      li {
        span,
        a {
          padding: 0 0.5rem;
          text-transform: uppercase;
          font-size: 0.875rem;
          line-height: 1.43;
          letter-spacing: 1px;
          font-weight: 600;
          color: nth($grays, 2);
        }
        &.active,
        &:last-child {
          span,
          a {
            font-weight: 600;
            color: $dark-blue;
          }
        }
        &:first-child {
          svg {
            padding: 0;
            height: 1rem;
          }
        }
        &:not(:first-child):before {
          content: "";
          background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cG9seWxpbmUgc3Ryb2tlPSIjODg4Q0E3IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbi16ZXJvIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHBvaW50cz0iNSAyIDExIDggNSAxNCIvPjwvc3ZnPg==");
          background-repeat: no-repeat;
          background-size: contain;
          width: 1rem;
          height: 1rem;
          margin-top: -2px;
        }
      }
    }
  }
}
</style>
