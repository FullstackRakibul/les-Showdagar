<script setup>
import { cn } from '@/lib/utils'

const props = defineProps({
  as: { type: String, default: 'label' },
  for: { type: String, default: undefined },
  class: { type: String, default: undefined }
})
</script>