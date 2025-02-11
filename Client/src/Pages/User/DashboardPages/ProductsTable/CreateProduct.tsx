import { useState, useEffect } from "react";
import categoryService from "../../../../services/category";
import brandService from "../../../../services/brand";
import processorService from "../../../../services/processor";
import graphicsCardService from "../../../../services/graphicscard";
import capacityService from "../../../../services/capacity";
import ramService from "../../../../services/ram";
import displayService from "../../../../services/display";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../../../Components/components/ui/dialog";
import { Label } from "../../../../Components/components/ui/label";
import { Input } from "../../../../Components/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../Components/components/ui/select";
import { Button } from "../../../../Components/components/ui/button";

const ProductDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    processor: "",
    graphicscard: "",
    brand: "",
    capacity: "",
    ram: "",
    display: "",
    price: "",
    discount: "",
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [graphicsCards, setGraphicsCards] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [rams, setRams] = useState([]);
  const [displays, setDisplays] = useState([]);

  useEffect(() => {
    categoryService.getAll().then((res) => setCategories(res.data.items ?? []));
    brandService.getAll().then((res) => setBrands(res.data.items ?? []));
    processorService.getAll().then((res) => setProcessors(res.data.items ?? []));
    graphicsCardService.getAll().then((res) => setGraphicsCards(res.data.items ?? []));
    capacityService.getAll().then((res) => setCapacities(res.data.items ?? []));
    ramService.getAll().then((res) => setRams(res.data.items ?? []));
    displayService.getAll().then((res) => setDisplays(res.data.items ?? []));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = async () => {
    try {
      await productService.create(formData);
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} />
          
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" value={formData.description} onChange={handleChange} />
          
          <Label>Category</Label>
          <Select value={formData.categoryId} onValueChange={(value) => setFormData((prev) => ({ ...prev, categoryId: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
  {categories.map((cat) => (
    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
  ))}
</SelectContent>

          </Select>
          
          <Label>Brand</Label>
          <Select value={formData.brand} onValueChange={(value) => setFormData((prev) => ({ ...prev, brand: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} />
          
          <Label htmlFor="discount">Discount</Label>
          <Input id="discount" name="discount" type="number" value={formData.discount} onChange={handleChange} />
          
          <Label htmlFor="images">Images</Label>
          <Input id="images" type="file" multiple onChange={handleFileChange} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
