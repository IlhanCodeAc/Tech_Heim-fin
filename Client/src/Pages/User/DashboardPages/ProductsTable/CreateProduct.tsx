import { useForm } from 'react-hook-form';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../Components/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../../Components/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../Components/components/ui/form';
import { Textarea } from '../../../../Components/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../Components/components/ui/select';
import { Input } from '../../../../Components/components/ui/input';
import { useQueries, useQuery } from '@tanstack/react-query';
import categoryService from '../../../../services/category';
import brandService from '../../../../services/brand';

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  price: z
    .number({
      invalid_type_error: 'Price must be a number',
      required_error: 'Price is required',
    })
    .positive(),
  categoryId: z.string().min(2, { message: 'Category is required' }),
});

function onSubmit(data: z.infer<typeof formSchema>) {
  // const promise = createProduct(data).then(() => {
  //   form.reset();
  //   cancelButtonRef.current?.click();
  // });
  // toast.promise(promise, {
  //   loading: 'Creating product...',
  //   success: 'Product created successfully',
  //   error: 'Failed to create product',
  // });
}


export default function ProductCreateDialog() {

  const {data} = useQuery(
    {
      queryKey: ['categories'],
      queryFn: categoryService.getAll, 
    },
   
  );
console.log(data)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      categoryId: '',
    },
  });
  return (
    <Dialog>
      <DialogTrigger>
        <button>Create Product</button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Create</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Discount </FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="type..."
                      {...field}
                      onChange={(e) => {
                        field.onChange({ target: { value: parseFloat(e.target.value) } });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                    <img src={field.value} alt="" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              {/* <Button type="button" ref={cancelButtonRef} variant="secondary" className="mr-2">
                Cancel
              </Button> */}
            </DialogClose>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
