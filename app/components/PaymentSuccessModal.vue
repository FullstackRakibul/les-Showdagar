<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-if="checkoutStore.showSuccessModal"
        class="fixed inset-0 z-[9999] overflow-y-auto"
      >
        <div class="flex items-center justify-center min-h-screen px-4 py-4">
          <div class="fixed inset-0 bg-black bg-opacity-50"></div>

          <div
            class="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
          >
            <!-- Success Animation -->
            <div class="mb-6">
              <div
                class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"
              >
                <CheckCircle class="w-10 h-10 text-green-600" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Order Placed!
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{
                  checkoutStore.currentOrder?.paymentInfo.method === "cash"
                    ? "Cash on Delivery selected."
                    : "Paymentsuccessful."
                }}
              </p>
            </div>

            <!-- Order Details -->
            <div
              v-if="checkoutStore.currentOrder"
              class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6 text-left"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Order ID:</span>
                <span class="font-mono text-sm font-medium">{{
                  checkoutStore.currentOrder.id
                }}</span>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400"
                  >Total Amount:</span
                >
                <span class="font-semibold text-lg text-primary"
                  >${{ checkoutStore.currentOrder.total.toFixed(2) }}</span
                >
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">Items:</span>
                <span class="text-sm font-medium"
                  >{{ checkoutStore.currentOrder.items.length }} item(s)</span
                >
              </div>
            </div>

            <!-- Confirmation Message -->
            <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <div class="flex items-center justify-center mb-2">
                <Mail class="w-5 h-5 text-blue-600 mr-2" />
                <span class="text-sm font-medium text-blue-800 dark:text-blue-300"
                  >Confirmation Sent</span
                >
              </div>
              <p class="text-xs text-blue-600 dark:text-blue-400">
                You will receive a confirmation with delivery details soon.
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <button
                @click="goToHome"
                class="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <ShoppingBag class="w-5 h-5" />
                <span>Continue Shopping</span>
              </button>

              <button
                @click="viewOrder"
                class="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 px-4 rounded-xl transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Package class="w-5 h-5" />
                <span>View Order Details</span>
              </button>

              <button
                @click="checkoutStore.closeSuccessModal"
                class="w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 py-2 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { useRouter } from "vue-router";
import { CheckCircle, Mail, ShoppingBag, Package } from "lucide-vue-next";
import { useCheckoutStore } from "@/stores/checkout";

const router = useRouter();
const checkoutStore = useCheckoutStore();

const goToHome = () => {
  checkoutStore.closeSuccessModal();
  router.push("/");
};

const viewOrder = () => {
  checkoutStore.closeSuccessModal();
  router.push("/orders");
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>
