import { AppSidebar } from '@/components/app-sidebar'
import { Component1 } from '@/components/charts/chart1'
import { Component2 } from '@/components/charts/chart2'
import { Component3 } from '@/components/charts/chart3'
import { ModeToggle } from '@/components/mode-toogle'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-12 shrink-0 items-center gap-0 border-b px-4">
					<SidebarTrigger />
					<ModeToggle />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-4">
						<Component1 />
						<Component2 />
						<Component3 />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
