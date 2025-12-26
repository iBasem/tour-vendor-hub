-- Create admin activity logs table for tracking platform events
CREATE TABLE public.admin_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  user_name TEXT NOT NULL,
  action_type TEXT NOT NULL, -- 'booking', 'registration', 'listing', 'refund', 'verification'
  action_description TEXT NOT NULL,
  entity_type TEXT, -- 'traveler', 'agency', 'package', 'booking'
  entity_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin pending actions table
CREATE TABLE public.admin_pending_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type TEXT NOT NULL, -- 'agency_approval', 'tour_review', 'refund_request', 'content_review'
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'resolved', 'dismissed'
  entity_type TEXT,
  entity_id UUID,
  assigned_to UUID,
  resolved_by UUID,
  resolved_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_pending_actions ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin_activity_logs - ONLY admins can access
CREATE POLICY "Only admins can view activity logs"
ON public.admin_activity_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert activity logs"
ON public.admin_activity_logs
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS policies for admin_pending_actions - ONLY admins can access
CREATE POLICY "Only admins can view pending actions"
ON public.admin_pending_actions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert pending actions"
ON public.admin_pending_actions
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update pending actions"
ON public.admin_pending_actions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete pending actions"
ON public.admin_pending_actions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updating updated_at on admin_pending_actions
CREATE TRIGGER update_admin_pending_actions_updated_at
BEFORE UPDATE ON public.admin_pending_actions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample activity logs
INSERT INTO public.admin_activity_logs (user_name, action_type, action_description, entity_type, created_at) VALUES
('Sarah Johnson', 'booking', 'completed booking for Tokyo Explorer', 'booking', now() - interval '10 minutes'),
('Adventure Tours Co.', 'listing', 'listed new package: Mountain Trek Nepal', 'package', now() - interval '1 hour'),
('Mike Chen', 'registration', 'registered as new traveler', 'traveler', now() - interval '2 hours'),
('Elite Travels', 'verification', 'submitted agency verification documents', 'agency', now() - interval '3 hours'),
('Emma Wilson', 'booking', 'cancelled booking for Paris Getaway', 'booking', now() - interval '5 hours');

-- Insert sample pending actions
INSERT INTO public.admin_pending_actions (action_type, title, description, priority, entity_type, created_at) VALUES
('agency_approval', 'Dream Vacations Ltd.', 'New travel agency pending verification', 'high', 'agency', now() - interval '2 hours'),
('tour_review', 'Bali Adventure Package', 'Tour package needs content review', 'medium', 'package', now() - interval '4 hours'),
('refund_request', 'Booking #TB-2024-1456', 'Customer requesting full refund', 'high', 'booking', now() - interval '6 hours'),
('content_review', 'Safari Experience Kenya', 'Package images need approval', 'low', 'package', now() - interval '8 hours');