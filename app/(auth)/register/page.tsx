import { supabase } from '@/lib/supabase';

export default async function RegisterPage() {
    const { data, error } = await supabase.from('leagues').select('*');

    console.log(data);
    console.log(error);

    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe cum
            minus, fugiat delectus nemo veritatis ullam deserunt nihil excepturi
            dolores qui, facilis sed accusamus! Ipsum voluptas fugiat nihil
            eveniet sunt!
        </div>
    );
}
