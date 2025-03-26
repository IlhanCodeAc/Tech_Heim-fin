import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import categoryService from '../../../../services/category';
import { toast } from "sonner";
import Swal from 'sweetalert2';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../Components/components/ui/dialog';
import { Button } from '../../../../Components/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../Components/components/ui/form';
import { Textarea } from '../../../../Components/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../Components/components/ui/select';
import { Input } from '../../../../Components/components/ui/input';
import brandService from '../../../../services/brand';
import displayService from '../../../../services/display';
import capacityService from '../../../../services/capacity';
import graphicsCardService from '../../../../services/graphicscard';
import ramService from '../../../../services/ram';
import processorService from '../../../../services/processor';
import { Checkbox } from '../../../../Components/components/ui/checkbox';
import productService from '../../../../services/product';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  description: z.string(),
  price: z.number().positive(),
  discount: z.number().positive(),
  categoryId: z.string().min(2),
  brandId: z.string().min(2),
  displayId: z.string().min(2),
  capacityId: z.string().min(2),
  graphicscardId: z.string().min(2),
  ramId: z.string().min(2),
  processorId: z.string().min(2),
  showInRecommendation: z.boolean(),
  images: z
    .instanceof(FileList, { message: "Images are required" })
    .refine((list) => list.length >= 3, "Minimum 3 files required")
    .refine((list) => list.length <= 5, "Maximum 5 files allowed")
    .transform((list) => Array.from(list))
    .refine(
      (files) => Array.from(files).every(file => 
        ["image/jpeg", "image/png", "application/pdf", "application/msword", 
         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        .includes(file.type)
      ),
      { message: "Invalid file type. Allowed types: JPG, PNG, PDF, DOC, DOCX" }
    )
    .refine(
      (files) => Array.from(files).every(file => file.size <= 5 * 1024 * 1024), 
      { message: "File size should not exceed 5MB" }
    ),
});

export default function ProductCreateDialog() {
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: categoryService.getAll }); 
  const { data: brands } = useQuery({ queryKey: ['brands'], queryFn: brandService.getAll });
  const { data: displays } = useQuery({ queryKey: ['displays'], queryFn: displayService.getAll });
  const { data: capacities } = useQuery({ queryKey: ['capacities'], queryFn: capacityService.getAll });
  const { data: graphicscards } = useQuery({ queryKey: ['graphicscards'], queryFn: graphicsCardService.getAll });
  const { data: rams } = useQuery({ queryKey: ['rams'], queryFn: ramService.getAll });
  const { data: processors } = useQuery({ queryKey: ['processors'], queryFn: processorService.getAll });

  const categoryOptions = useMemo(() => {
    if (!categories?.data.items) return [];
    return categories.data.items.map((category) => ({
      value: category._id,
      label: category.name,
    }));
  }, [categories]);

  const brandOptions = useMemo(() => {
    if (!brands?.data.items) return [];
    return brands.data.items.map((brand) => ({
      value: brand._id,
      label: brand.name,
    }));
  }, [brands]);

  const displayOptions = useMemo(() => {
    if (!displays?.data.items) return [];
    return displays.data.items.map((display) => ({
      value: display._id,
      label: display.name,
    }));
  }, [displays]);

  const capacityOptions = useMemo(() => {
    if (!capacities?.data.items) return [];
    return capacities.data.items.map((capacity) => ({
      value: capacity._id,
      label: capacity.name,
    }));
  }, [capacities]);

  const graphicsCardOptions = useMemo(() => {
    if (!graphicscards?.data.items) return [];
    return graphicscards.data.items.map((graphicsCard) => ({
      value: graphicsCard._id,
      label: graphicsCard.name,
    }));
  }, [graphicscards]);

  const ramOptions = useMemo(() => {
    if (!rams?.data.items) return [];
    return rams.data.items.map((ram) => ({
      value: ram._id,
      label: ram.name,
    }));
  }, [rams]);

  const processorOptions = useMemo(() => {
    if (!processors?.data.items) return [];
    return processors.data.items.map((processor) => ({
      value: processor._id,
      label: processor.name,
    }));
  }, [processors]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      discount: 0,
      categoryId: '',
      brandId: '',
      displayId: '',
      capacityId: '',
      graphicscardId: '',
      ramId: '',
      processorId: '',
      images: [],
      showInRecommendation: false
    },
  });
  
  const { mutateAsync } = useMutation({
    mutationFn: productService.create
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted with values:", values);
    const promise = mutateAsync(values);
    toast.promise(promise, {
      loading: "Creating a product...",
      success: "Product created succssfully!",
      error: "Something went wrong"
    });
    promise.then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product created successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
    });
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full md:w-auto">Create Product</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg md:max-w-3xl sm:max-w-full sm:p-4">

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name..." {...field} />
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
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price..."
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter discount..."
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showInRecommendation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 mt-5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Show in recommendation</FormLabel>
                    <FormDescription>
                      Show this product in recommendation section
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter product description..." {...field} />
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
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brandOptions.map((brand) => (
                        <SelectItem key={brand.value} value={brand.value}>
                          {brand.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {displayOptions.map((display) => (
                        <SelectItem key={display.value} value={display.value}>
                          {display.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Capacity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {capacityOptions.map((capacity) => (
                        <SelectItem key={capacity.value} value={capacity.value}>
                          {capacity.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="graphicscardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graphics Card</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Graphics Card" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {graphicsCardOptions.map((graphicsCard) => (
                        <SelectItem key={graphicsCard.value} value={graphicsCard.value}>
                          {graphicsCard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ramId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select RAM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ramOptions.map((ram) => (
                        <SelectItem key={ram.value} value={ram.value}>
                          {ram.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="processorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Processor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {processorOptions.map((processor) => (
                        <SelectItem key={processor.value} value={processor.value}>
                          {processor.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Files</FormLabel>
                  <FormControl>
                    <Input
                      multiple
                      type="file"
                      accept="image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex justify-end gap-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
