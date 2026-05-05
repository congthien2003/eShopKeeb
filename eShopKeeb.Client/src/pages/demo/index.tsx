import Page from '@/components/ui/page';
import { Typography } from '@/components/ui/typography';
import { typographyVariants } from '@/components/ui/typography/typographyVariant';
import { Button } from '@/components/ui/button';
import {
  ButtonVariantClass,
  ButtonSizesClass,
} from '@/components/ui/button/buttonVariant';
import type { TypographyVariant } from '@/components/ui/typography/typography';
import { showSuccess } from '@/lib/toast';
import ReusableDialogExample from '@/components/ui/dialog/ReusableDialogExample';
import { useDispatch } from 'react-redux';
import { useCallback, useMemo, useState } from 'react';
import { hideLoading, showLoading } from '@/stores/loading/loadingSlice';
import { SelectAsync, type SelectOption } from '@/components/ui/select';

const mockCities = [
  'Hanoi',
  'Ho Chi Minh City',
  'Da Nang',
  'Hai Phong',
  'Can Tho',
  'Nha Trang',
  'Hue',
  'Vung Tau',
  'Quy Nhon',
  'Buon Ma Thuot',
  'Thai Nguyen',
  'Vinh',
  'Dong Hoi',
  'Pleiku',
  'Long Xuyen',
];

const mockProducts = [
  'CRM Basic',
  'CRM Pro',
  'CMS Starter',
  'CMS Growth',
  'Marketing Suite',
  'Support Suite',
  'Analytics Pro',
  'Automation Plus',
  'Customer 360',
  'Sales Pipeline',
  'Lead Magnet',
  'Content Hub',
];

function fakeSearchApi(data: string[], query: string) {
  return new Promise<SelectOption[]>((resolve) => {
    setTimeout(() => {
      const filtered = data
        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8)
        .map((item) => ({
          value: item,
          label: item,
          description: `Result for "${query || 'all'}"`,
        }));

      resolve(filtered);
    }, 700);
  });
}

function DemoPage() {
  const typographyVariantKeys = Object.keys(typographyVariants);
  const buttonVariantKeys = Object.keys(ButtonVariantClass);
  const buttonSizeKeys = Object.keys(ButtonSizesClass);

  const dispatch = useDispatch();
  const [singleCity, setSingleCity] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const showLoadingGlobal = useCallback(() => {
    dispatch(showLoading());

    setTimeout(() => {
      dispatch(hideLoading());
    }, 3000);
  }, [dispatch]);

  const selectedProductLabel = useMemo(
    () =>
      selectedProducts.length > 0
        ? selectedProducts.join(', ')
        : 'Chưa chọn sản phẩm nào',
    [selectedProducts]
  );

  return (
    <Page title="Demo page">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-background to-muted/30 p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                UI playground
              </span>
              <div className="space-y-2">
                <Typography variant="h2-bold" className="block">
                  Demo page
                </Typography>
                <Typography className="block text-muted-foreground">
                  Khu vực thử nhanh các component nền tảng, sắp xếp theo nhóm để
                  dễ quan sát và so sánh style.
                </Typography>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                label="Toast"
                onClick={() => showSuccess('Hello')}
                variant="outline"
              />
              <Button
                label="Show Loading Global"
                onClick={showLoadingGlobal}
                variant="default"
              />
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
          <section className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <Typography variant="h4-bold" className="block">
                  Actions
                </Typography>
                <Typography className="block text-sm text-muted-foreground">
                  Những hành động nhanh thường dùng khi test UI.
                </Typography>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                label="Toast success"
                onClick={() => showSuccess('Hello')}
                variant="outline"
                className="w-full justify-center"
              />
              <Button
                label="Loading global"
                onClick={showLoadingGlobal}
                variant="outline"
                className="w-full justify-center"
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <Typography variant="h4-bold" className="block">
                Dialog example
              </Typography>
              <Typography className="block text-sm text-muted-foreground">
                Component dialog độc lập để kiểm tra spacing và overlay.
              </Typography>
            </div>
            <ReusableDialogExample />
          </section>
        </div>

        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <Typography variant="h4-bold" className="block">
                Async select
              </Typography>
              <Typography className="block text-sm text-muted-foreground">
                Demo search async cho single và multiple select bằng dữ liệu giả.
              </Typography>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3 rounded-xl border bg-muted/15 p-4">
              <div>
                <Typography variant="h5-bold" className="block">
                  Single select
                </Typography>
                <p className="text-sm text-muted-foreground">
                  Search và chọn một item từ danh sách.
                </p>
              </div>
              <SelectAsync
                label="Choose a city"
                placeholder="Search city..."
                value={singleCity}
                onValueChange={(next) => setSingleCity(next as string)}
                loadOptions={(query) => fakeSearchApi(mockCities, query)}
              />
              <p className="text-xs text-muted-foreground">
                Selected value: <span className="font-medium">{singleCity || '—'}</span>
              </p>
            </div>

            <div className="space-y-3 rounded-xl border bg-muted/15 p-4">
              <div>
                <Typography variant="h5-bold" className="block">
                  Multiple select
                </Typography>
                <p className="text-sm text-muted-foreground">
                  Search và chọn nhiều item liên tục.
                </p>
              </div>
              <SelectAsync
                label="Choose products"
                placeholder="Search products..."
                multiple
                value={selectedProducts}
                onValueChange={(next) =>
                  setSelectedProducts(Array.isArray(next) ? next : [next])
                }
                loadOptions={(query) => fakeSearchApi(mockProducts, query)}
              />
              <p className="text-xs text-muted-foreground">
                Selected values:{' '}
                <span className="font-medium">{selectedProductLabel}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <Typography variant="h4-bold" className="block">
                Typography variants
              </Typography>
              <Typography className="block text-sm text-muted-foreground">
                Xem nhanh toàn bộ hệ typography trong một layout gọn hơn.
              </Typography>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {typographyVariantKeys.length} styles
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {typographyVariantKeys.map((variant) => (
              <div
                key={variant}
                className="rounded-xl border border-dashed bg-muted/20 p-4 transition-colors hover:bg-muted/40"
              >
                <Typography variant={variant as TypographyVariant}>
                  {variant}
                </Typography>
                <p className="mt-2 text-xs text-muted-foreground">
                  Variant: <span className="font-medium">{variant}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <Typography variant="h4-bold" className="block">
                Button showcase
              </Typography>
              <Typography className="block text-sm text-muted-foreground">
                Group theo variant, size và combination để so sánh trực quan.
              </Typography>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {buttonVariantKeys.length} variants • {buttonSizeKeys.length} sizes
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <Typography variant="h5-bold" className="block">
                  Button variants
                </Typography>
              </div>
              <div className="flex flex-wrap gap-3">
                {buttonVariantKeys.map((variant) => (
                  <Button key={variant} variant={variant as any}>
                    {variant}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <Typography variant="h5-bold" className="block">
                  Button sizes
                </Typography>
              </div>
              <div className="flex flex-wrap gap-3">
                {buttonSizeKeys.map((size) => (
                  <Button key={size} variant="default" size={size as any}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <Typography variant="h5-bold" className="block">
                  Variant + size matrix
                </Typography>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {buttonVariantKeys.map((variant) =>
                  buttonSizeKeys.map((size) => (
                    <Button
                      key={`${variant}-${size}`}
                      variant={variant as any}
                      size={size as any}
                      className="justify-center"
                    >
                      {variant} • {size}
                    </Button>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}

export default DemoPage;
