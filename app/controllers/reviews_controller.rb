class ReviewsController < ApplicationController
    def index
        doctor = Doctor.find(params[:doctor_id])
        reviews = {:reviews => Review.where(:doctor => params[:doctor_id]).order(updated_at: :desc)}
        render :json => doctor.as_json.merge(reviews)
    end

    def create
        doctor = Doctor.find(params[:doctor_id])
        review = Review.create({:doctor => doctor, :description => new_review_params[:description]})
        render :json => review
    end

    def show
        doctor = Doctor.find(params[:doctor_id])
        reviews = {:reviews => Review.find(params[:id]).order(updated_at: :desc)}
        render :json => doctor.as_json.merge(reviews)
    end

    def update
        review = Review.find(params[:id])
        review.update_attributes(update_review_params)
        render :json => review
    end

    def destroy
        render :json => Review.destroy(params[:id])
    end

    private
    def new_review_params
        params.require(:review).require(:description)
        params.require(:review).permit(:description)
    end

    private
    def update_review_params
        params.require(:review).permit(:description)
    end
end 
