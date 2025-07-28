import { ref } from 'vue';

export const useContributors = () => {
  const contributors = ref([]);

  fetch(
    'https://api.github.com/repos/twilson63/permaweb-cookbook/contributors?q=contributions&order=desc'
  )
    .then((res) => {
      if (res.ok) return res.json();
      else return [];
    })
    .then((result) => {
      contributors.value = result;
    });

  return contributors;
}