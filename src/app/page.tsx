'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const [value, setValue] = useState<string>('');

    const trpc = useTRPC();
    const invoke = useMutation(trpc.invoke.mutationOptions({
        onSuccess: () => {
            toast.success("Background Job Started");
        }
    }));

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <Button
                disabled={invoke.isPending}
                onClick={() => invoke.mutate({ value })}
            >Invoke Background Job</Button>
        </div>
    )
}