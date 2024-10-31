

# 디자인 시스템(라이브러리) 관련해서는 추후 결정


# get
```js
import axios from '../axios';

export async function getServerSideProps(context) {
  try {
    const response = await axios.get('/path/to/endpoint');
    const data = response.data;

    return {
      props: { data },
    };
  } catch (error) {
    console.error('GET Error:', error);
    return {
      props: { data: null },
    };
  }
}
```

# post
```js
import axios from '../axios';
export default function HomePage({ data }) {
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const payload = {
                key1: event.target.key1.value,
                key2: event.target.key2.value,
            };

            const response = await axios.post('/path/to/endpoint', payload);
            console.log('POST Response:', response.data);
        } catch (error) {
            console.error('POST Error:', error);
        }
    };
}
```