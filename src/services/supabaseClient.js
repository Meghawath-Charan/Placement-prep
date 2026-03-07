import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xxloktwsvxgrjatmnvdq.supabase.co";
const supabaseKey = "sb_publishable_VYq3PYoYKKhUpSY_pXim0Q_bohfTiPX";

export const supabase = createClient(supabaseUrl, supabaseKey);